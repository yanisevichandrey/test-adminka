import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
import './Products.css';
import axios from '../axios-users';
import * as actionCreators from '../store/actionCreators';

class Products extends Component {

  state = {
    isDelete: false,
    isAdd: false,
    isEdit: false,
    idProduct: null,
    nameProduct: '',
    priceProduct: '',
    currentProduct: null,
    cUser: null
  }

  

  // async componentDidMount() {
  //   const data = await this.getCurrentUser();
  //   console.log(data)
  //   this.props.getCurrentUser()
  //   this.changeCurrentUser(data);
  // }

  getCurrentUser = () => {
   return axios.get('/currentUser.json')
    .then(res => res.data);
  }

  changeCurrentUser = (data) => {
    this.setState({cUser: data})
  }

  showDeleteModal = (id) => {
    this.setState({ isDelete: true, idProduct: id })
  }

  hideDeleteModal = () => {
    this.setState({ isDelete: false })
  }

  showAddModal = () => {
    this.setState({ isAdd: true })
  }

  hideAddModal = () => {
    this.setState({ isAdd: false })
  }

  showEditModal = (index) => {
    this.setState({ isEdit: true, currentProduct: index, isAdd: false, nameProduct: '', priceProduct: '' })
  }

  hideEditModal = () => {
    this.setState({ isEdit: false })
  }

  changeNameProduct = (e) => {
    this.setState({ nameProduct: e.target.value })
  }

  changePriceProduct = (e) => {
    this.setState({ priceProduct: e.target.value })
  }

  addProduct = () => {
    let cUser = this.props.currentUser;
    let cProducts = cUser.products;
    const newProduct = {
      id: Date.now(),
      name: this.state.nameProduct,
      price: this.state.priceProduct
    }

    cProducts = [...cProducts, newProduct];
    cUser.products = cProducts;

    // axios.post('/currentUser.json', cUser)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    this.setState({ 
      cUser: cUser, 
      isAdd: false, 
      nameProduct: '', 
      priceProduct: '' 
    })

    this.props.addProduct(cUser)
    this.updateProducts(cUser)
  }

  updateProducts = (cUser) => {
    let users = this.props.users;

    let user;
    let index;
    
    for (let i = 0; i < users.length; i++) {
      
      if (users[i].login === cUser.login) {
        user = users[i];
        index = i;
        break;
      }
      
    }

    console.log(cUser)
    console.log(user)

    user = cUser;

    // axios.put('/users.json/' + index, cUser)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

  }

  deleteProduct = (id) => {
    let cUser = this.props.currentUser;
    let cProducts = cUser.products;

    
    cProducts = [...cProducts.filter(p => p.id !== this.state.idProduct)];
    cUser.products = cProducts;
    console.log(cUser)

    // axios.delete('/currentUser.json')
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    this.setState({
      cUser: cUser,
      isOpenModal: false, 
      idProduct: null,
      isDelete: false
    })

    this.props.deleteProduct(this.state.cUser)
  }

  editProduct = (id) => {

    let cUser = this.props.currentUser;
    let cProducts = cUser.products;

    const currentProduct = this.state.currentProduct;
    let product = {
      ...cProducts[currentProduct]
    }
    product.name = this.state.nameProduct;
    product.price = this.state.priceProduct;
    cProducts[currentProduct] = product;
    cUser.products = cProducts;
    
    this.setState({ 
      cUser: cUser, 
      isEdit: false
    }) 

    this.props.editProduct(this.state.cUser)
  }


  render() {
    return (

      <div className="container" style={{ marginTop: 50 }}>
        <Modal isDelete={this.state.isDelete}>
          <DeleteComponent hide={this.hideDeleteModal} deleteProduct={this.deleteProduct} />
        </Modal>
        <Modal isAdd={this.state.isAdd}>
          <div className="addProduct">
            <h2>Add product</h2>
            <input type="text" placeholder="Name" value={this.state.nameProduct}  onChange={this.changeNameProduct} />
            <input type="text" placeholder="Price" value={this.state.priceProduct} onChange={this.changePriceProduct} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-success" onClick={this.addProduct}>Add</button>
              <button className="btn btn-danger" onClick={this.hideAddModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <Modal isEdit={this.state.isEdit}>
          <div className="addProduct">
            <h2>Edit product</h2>
            {/* <input type="text" placeholder="Name" value={this.props.currentUser.products[this.state.currentProduct]} onChange={this.changeNameProduct} /> */}
            {/* <input type="text" placeholder="Price" value={this.props.currentUser.products[this.state.currentProduct].price} onChange={this.changePriceProduct} /> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-success" onClick={this.editProduct}>Edit</button>
              <button className="btn btn-danger" onClick={this.hideEditModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <button className="btn btn-primary add" onClick={this.showAddModal}>Add product</button>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.currentUser && this.props.currentUser.products && this.props.currentUser.products.map((p, index) => {
                return <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td style={{width: '70px', textAlign: 'center'}}><i style={{marginRight: '5px', cursor: 'pointer'}} onClick={() => this.showEditModal(index)}><i className="fas fa-edit"></i></i><i style={{cursor: 'pointer'}} onClick={() => this.showDeleteModal(p.id)}><i className="fas fa-trash-alt"></i></i></td>
                </tr>
              })
            }
          </tbody>
        </Table>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onAddProduct: cUser => dispatch(actionCreators.addProduct(cUser)),
    getCurrentUser: cUser => dispatch(actionCreators.getCurrentUser(cUser)),
    addProduct: cUser => dispatch(actionCreators.addProduct(cUser)),
    deleteProduct: cUser => dispatch(actionCreators.deleteProduct(cUser)),
    editProduct: cUser => dispatch(actionCreators.editProduct(cUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
