import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Modal, Upload, UploadFile, UploadProps} from 'antd';
import {RcFile} from 'antd/es/upload';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase/firebase';
import {foodsStore} from '../../store/foods';
import {addAxiosErrorNotification} from '../../utils/notification';
import {imgUploadStyle} from './styles';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const ImgUploadModal = observer(() => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
    setFileList(newFileList);

  const handleClose = () => {
    foodsStore.setIsOpenImgUpload(false);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line require-atomic-updates
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  useEffect(() => () => {
    foodsStore.setFoodId(null);
  }, []);

  const uploadButton = (
    <div>
      {fileUploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  const handleFinish = async () => {
    if (fileList[0]?.uid) {
      setFileUploadLoading(true);

      const imageRef = ref(storage, `files/${fileList[0]?.name}`);

      await uploadBytes(imageRef, fileList[0].originFileObj as RcFile)
        .then(() => {
          message.success('Fayl muvaffaqiyatli yuklandi!!!');
        })
        .catch(addAxiosErrorNotification);

      await getDownloadURL(imageRef).then(async (url) => {
        foodsStore.imgChangeFood({
          food: foodsStore.foodId!,
          image: url,
        })
          .finally(() => {
            setFileUploadLoading(false);
          })
        ;
      });
    }
  };

  return (
    <Modal
      open={foodsStore.isOpenImgUpload}
      onCancel={handleClose}
      width={300}
      title="Img Change"
      onOk={handleFinish}
      confirmLoading={fileUploadLoading}
    >

      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={imgUploadStyle.uploadModalImg} src={previewImage} />
      </Modal>
    </Modal>
  );
});
