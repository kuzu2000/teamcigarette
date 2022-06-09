import React, { useState } from 'react';
import Sponsors from '../components/Sponsors/Sponsors';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from './../firebase';
import { addNew } from '../redux/api';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
`;

const ProductCreate = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  top: -140%;
  justify-content: center;
  transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const ProductForm = styled.form`
  background-color: rgb(29, 29, 29);
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 10px;
`;

const ProductHeader = styled.h3`
  text-align: center;
`;

const ProductLabel = styled.label`
  margin-top: 10px;
  font-weight: 500;
`;

const ProductInput = styled.input`
  background: none;
  background-color: rgb(17, 17, 17);
  outline: none;
  border: none;
  padding: 3px 12px;
  color: #fff;
  border-radius: 5px;
`;

const ProductTextArea = styled.textarea`
  background: none;
  background-color: rgb(17, 17, 17);
  outline: none;
  border: none;
  padding: 3px 12px;
  color: #fff;
  border-radius: 5px;
`;

const ProductCreateButton = styled.button`
  margin-top: 20px;
  border: none;
  background: none;
  background-color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    filter: brightness(70%);
  }

  &:disabled {
      cursor: not-allowed;
  }
`;

const CreateNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const isFetching = useSelector((state) => state.newsList.isFetching);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // htmlFor instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          const news = {
            ...inputs,
            image: url,
          };
          console.log(news);
          addNew(dispatch, news, navigate);
        });
      }
    );
  };

  return (
    <>
      <Sponsors />
      <Container>
        <ProductCreate>
          <ProductForm onSubmit={handleSubmit}>
            <ProductHeader>Add News</ProductHeader>
            <ProductLabel htmlFor="title">News Name</ProductLabel>
            <ProductInput
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
            />
            <ProductLabel htmlFor="description">News Description</ProductLabel>
            <ProductTextArea
              name="description"
              id="description"
              cols="30"
              rows="5"
              onChange={handleChange}
            ></ProductTextArea>
            <ProductLabel htmlFor="category">News Category</ProductLabel>
            <ProductInput
              onChange={handleChange}
              type="text"
              name="category"
              id="category"
            />
            <ProductLabel htmlFor="image">Image</ProductLabel>
            <ProductInput
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="image"
              id="image"
            />
            {isFetching ? (
              <ProductCreateButton disabled={isFetching} type="submit">
                <i className="fa fa-spinner fa-spin"></i> Add
              </ProductCreateButton>
            ) : (
              <ProductCreateButton type="submit" onClick={handleSubmit}>
                Add
              </ProductCreateButton>
            )}
          </ProductForm>
        </ProductCreate>
      </Container>
    </>
  );
};

export default CreateNews;
