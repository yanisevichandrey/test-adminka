import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
import './Products.css';
import axios from '../axios-users';

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

  // deleteProduct = (id) => {
  //   this.setState({
  //     products: [...this.state.products.filter(p => p.id !== id)], isOpenModal: false, idProduct: null
  //   })
  // }

  async componentDidMount() {
    const data = await this.getCurrentUser();
    console.log(data)
    this.changeCurrentUser(data);
  }

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

  // addProduct = () => {
  //   const newProduct = {
  //     id: Date.now(),
  //     name: this.state.nameProduct,
  //     price: this.state.priceProduct
  //   }

  //   this.setState({ products: [...this.state.products, newProduct], isAdd: false, nameProduct: '', priceProduct: '' })
  // }

  // editProduct = (id) => {
  //   const currentProduct = this.state.currentProduct;
  //   let product = {
  //     ...this.state.products[currentProduct]
  //   }
  //   product.name = this.state.nameProduct;
  //   product.price = this.state.priceProduct;
  //   const products = [...this.state.products];
  //   products[currentProduct] = product;
  //   this.setState({ products: products, isEdit: false}) 
  // }


  render() {
    return (

      <div className="container" style={{ marginTop: 50 }}>
        <Modal isDelete={this.state.isDelete}>
          <DeleteComponent hide={this.hideDeleteModal} deleteProduct={() => this.props.onDeleteProduct(this.state.idProduct)} />
        </Modal>
        <Modal isAdd={this.props.isAdd}>
          <div className="addProduct">
            <h2>Add product</h2>
            <input type="text" placeholder="Name" value={this.state.nameProduct}  onChange={this.changeNameProduct} />
            <input type="text" placeholder="Price" value={this.state.priceProduct} onChange={this.changePriceProduct} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-success" onClick={() => this.props.onAddProduct(this.state.nameProduct, this.state.priceProduct, this.state.isAdd)}>Add</button>
              <button className="btn btn-danger" onClick={this.props.onHideAddModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <Modal isEdit={this.state.isEdit}>
          <div className="addProduct">
            <h2>Edit product</h2>
            <input type="text" placeholder="Name" value={this.state.nameProduct} onChange={this.changeNameProduct} />
            <input type="text" placeholder="Price" value={this.state.priceProduct} onChange={this.changePriceProduct} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-success" onClick={() => this.props.onEditProduct(this.state.currentProduct, this.state.nameProduct, this.state.priceProduct)}>Edit</button>
              <button className="btn btn-danger" onClick={this.hideEditModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <button className="btn btn-primary add" onClick={this.props.onShowAddModal}>Add product</button>
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
              this.state.cUser.products.map((p, index) => {
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
    isAdd: state.isAdd,
    isDelete: state.isDelete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (name, price, isAdd) => dispatch({type: actionTypes.ADD_PRODUCT, productData: {name: name, price: price}, isAdd: isAdd}),
    onHideAddModal: () => dispatch({type: actionTypes.HIDE_ADDMODAL}),
    onShowAddModal: () => dispatch({type: actionTypes.SHOW_ADDMODAL}),
    onDeleteProduct: (id) => dispatch({type: actionTypes.DELETE_PRODUCT, id: id}),
    onEditProduct: (index, nameProduct, priceProduct) => dispatch({type: actionTypes.EDIT_PRODUCT, index: index, nameProduct: nameProduct, priceProduct: priceProduct})
    // onHideDeleteModal: () => dispatch({type: actionTypes.HIDE_DELETEMODAL}),
    // onShowDeleteModal: () => dispatch({type: actionTypes.SHOW_DELETEMODAL})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
