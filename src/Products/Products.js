import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import DeleteComponent from '../DeleteComponent/DeleteComponent';
import './Products.css';
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
    cUser: null,
    products: []
  }

  componentDidMount() {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const arr = [];
    if(savedProducts) {
      this.props.getProducts(savedProducts)
    } else {
      this.props.getProducts(arr)
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if(prevProps.products !== this.props.products) {
      this.saveToLocalStarage()
    }
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
    this.setState({ isEdit: true, currentProduct: index, isAdd: false, nameProduct: this.props.products[index].name, priceProduct: this.props.products[index].price })
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
    let products = this.props.products;
    const newProduct = {
      id: Date.now(),
      name: this.state.nameProduct,
      price: this.state.priceProduct
    }

    products = [...products, newProduct];

    this.setState({ 
      isAdd: false, 
      nameProduct: '', 
      priceProduct: '' 
    })
    this.saveToLocalStarage()
    this.props.addProduct(products);
    
  }

  deleteProduct = (id) => {
    let products = this.props.products;

    products = [...products.filter(p => p.id !== this.state.idProduct)];

    this.setState({
      idProduct: null,
      isDelete: false
    })

    this.props.deleteProduct(products)
  }

  editProduct = (id) => {
    let products = this.props.products;

    const currentProduct = this.state.currentProduct;
    let product = {
      ...products[currentProduct]
    }
    product.name = this.state.nameProduct;
    product.price = this.state.priceProduct;
    products[currentProduct] = product;
    
    this.setState({ 
      isEdit: false
    }) 

    this.props.editProduct(products)
  }

  saveToLocalStarage = () => {
    const products = JSON.stringify(this.props.products)

    localStorage.setItem('products', products)
  }


  render() {

    let table = null;
    if(this.props.products) {
      table = <div>
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
              this.props.products && this.props.products.map((p, index) => {
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
    } else {
      table = <h2>Додайте продукт!</h2>
    }

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
            <input type="text" placeholder="Name" value={this.state.nameProduct} onChange={this.changeNameProduct} />
            <input type="text" placeholder="Price" value={this.state.priceProduct} onChange={this.changePriceProduct} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-success" onClick={this.editProduct}>Edit</button>
              <button className="btn btn-danger" onClick={this.hideEditModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <button className="btn btn-primary add" onClick={this.showAddModal}>Add product</button>
        {table}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    users: state.user.users,
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getCurrentUser: cUser => dispatch(actionCreators.getCurrentUser(cUser)),
    addProduct: products => dispatch(actionCreators.addProduct(products)),
    deleteProduct: products => dispatch(actionCreators.deleteProduct(products)),
    editProduct: products => dispatch(actionCreators.editProduct(products)),
    getProducts: products => dispatch(actionCreators.getProducts(products))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
