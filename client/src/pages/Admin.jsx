import React, { useState } from 'react';
import Sponsors from '../components/Sponsors/Sponsors';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addProducts } from './../redux/api';
import { fetchAdminOrders } from '../redux/orderSlice';
import Moment from 'moment';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from './../firebase';
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  color: #fff;
  position: relative;
  font-family: sans-serif;
`;

const AddButton = styled.button`
  margin: 20px;
  border: none;
  background: none;
  background-color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    filter: brightness(70%);
  }
`;

const ProductList = styled.div``;

const ProductListTable = styled.table`
  width: 80%;
`;

const ProductTableHeader = styled.th`
  text-align: center;
`;

const ProductTableRow = styled.tr`
  &:nth-child(odd) {
    background-color: rgb(29, 29, 29);
  }
`;

const ProductTableData = styled.td`
  padding: 10px;
`;

const EditButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid white;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: white;
  }
`;

const DeleteButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgb(255, 0, 0);
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: rgb(255, 0, 0);
  }
`;

const ProductCreate = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  top: -140%;
  align-items: center;
  justify-content: center;
  transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  ${({ open }) =>
    open &&
    `
  top: -20%;
  background: rgba(0, 0, 0, 0.7);
  `}
`;

const ProductForm = styled.form`
  background-color: rgb(29, 29, 29);
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 10px;
`;

const ProductClose = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 2.5rem;
  font-weight: 600;
  cursor: pointer;
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
`;


const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const urls = []
  const orders = useSelector(state => state.order.orders)

  React.useEffect(() => {
    document.title = `Admin Page - Team Cigarette`
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  React.useEffect(() => {
    dispatch(fetchAdminOrders())
  }, [dispatch])

  const handleFilesChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const images = e.target.files[i];
      images["id"] = Math.random()
      setFiles((prev) => [...prev, images]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promises = [];
    files.forEach((file) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
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
          console.log(error);
        },
        async () => {
          // Handle successful uploads on complete
          // htmlFor instance, get the download URL: https://firebasestorage.googleapis.com/...
          await getDownloadURL(uploadTask.snapshot.ref).then((URLs) => {
            console.log(URLs);
            urls.push(URLs)
            const product = {
              ...inputs,
              frontSide: urls[2],
              backSide: urls[1],
              displayImg: urls[0]
            };
            console.log(product);
            addProducts(dispatch, product, navigate);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => alert('All images uploaded'))
      .then((err) => console.log(err));
  };

  console.log(inputs)

  console.log('urls', urls);

  return (
    <>
      <Sponsors />

      <Container>
        <AddButton onClick={() => setOpen(true)}>+ Add Product</AddButton>
        <ProductList>
          <ProductListTable>
            <thead>
              <tr>
              <ProductTableHeader>ID</ProductTableHeader>
                   <ProductTableHeader>Date</ProductTableHeader>
                   <ProductTableHeader>Total</ProductTableHeader>
                   <ProductTableHeader>Paid</ProductTableHeader>
                   <ProductTableHeader>Delievered</ProductTableHeader>
                   <ProductTableHeader>Actions</ProductTableHeader>
              </tr>
            </thead>
            <tbody>
            {Array.from(orders).map((order) => (
                   <ProductTableRow key={order._id}>
                     <ProductTableData>{order._id}</ProductTableData>
                     <ProductTableData>
                       {Moment(order.createdAt).format('MMMM DD, YYYY')}
                     </ProductTableData>
                     <ProductTableData>${order.total}</ProductTableData>
                     <ProductTableData>
                       {order.isPaid ? 'Yes' : 'No'}
                     </ProductTableData>
                     <ProductTableData>
                       {order.status ? 'Yes' : 'No'}
                     </ProductTableData>
                     <ProductTableData>
                       <EditButton><Link to={`/admin/${order._id}`} className="link">Update</Link></EditButton>
                       <EditButton><Link to={`/history/${order._id}`} className="link">Details</Link></EditButton>
                     </ProductTableData>
                   </ProductTableRow>
                 ))}
            </tbody>
          </ProductListTable>
        </ProductList>

        <ProductCreate open={open}>
          <ProductForm>
            <ProductClose onClick={() => setOpen(false)}>&times;</ProductClose>
            <ProductHeader>Add Product</ProductHeader>
            <ProductLabel htmlFor="name">Product Name</ProductLabel>
            <ProductInput
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
            />
            <ProductLabel htmlFor="price">Product Price</ProductLabel>
            <ProductInput
              onChange={handleChange}
              type="number"
              name="price"
              id="price"
            />
            {/* <ProductLabel htmlFor="size">Product Size</ProductLabel>
            <select name="size" id="size" onChange={handleChange}>
              <option value="XL">XL</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="SM">SM</option>
            </select> */}
            <ProductLabel htmlFor="stock">Product Availability</ProductLabel>
            <select name="isAvailable" id="stock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <ProductLabel htmlFor="desc">Product Description</ProductLabel>
            <ProductTextArea
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              onChange={handleChange}
            ></ProductTextArea>
            <ProductLabel htmlFor="frontSide">Front Picture</ProductLabel>
            <ProductInput
              onChange={handleFilesChange}
              type="file"
              accept="image/png , image/jpeg"
              name="frontSide"
              id="frontSide"
            />
            <ProductLabel htmlFor="backSide">Back Picture</ProductLabel>
            <ProductInput
              onChange={handleFilesChange}
              type="file"
              name="backSide"
              accept="image/png , image/jpeg"
              id="backSide"
            />
            <ProductLabel htmlFor="displayImg">Detail Picture</ProductLabel>
            <ProductInput
              onChange={handleFilesChange}
              type="file"
              name="displayImg"
              accept="image/png , image/jpeg"
              id="displayImg"
            />
            <ProductCreateButton type="submit" onClick={handleSubmit}>
              Add
            </ProductCreateButton>
          </ProductForm>
        </ProductCreate>
      </Container>
    </>
  );
};

export default Admin;
