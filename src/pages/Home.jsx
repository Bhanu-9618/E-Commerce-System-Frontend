import Navbar from '../components/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {

    const API = "http://localhost:8080";

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const loadProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${API}/product/get-all`);
            setProduct(res.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load products!")
        } finally {
            setLoading(false);
        }
    };
    const addToCart = (productToAdd) => {
        setCartItems(prevCartItems => {

            const existingItem = prevCartItems.find(item => item.id === productToAdd.id);

            if (existingItem) {

                return prevCartItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, cartQty: item.cartQty + 1 }
                        : item
                );
            } else {

                return [...prevCartItems, { ...productToAdd, cartQty: 1 }];
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <>
            <Navbar></Navbar>
            <center>
                <h1 className='mt-5'>All Products</h1>
            </center>
            {loading && <div>Loading Products...</div>}
            {error && <div className="text-danger">{error}</div>}
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((p) =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.unitPrice}</td>
                            <td>{p.qty}</td>
                            <td>
                                <input type="button" value="Add to Cart" onClick={() => addToCart(p)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <center>
                <button type="button" className="btn btn-primary me-3" onClick={loadProducts}>
                    Reload
                </button>
            </center>
            <center className='mt-5'>
                <h1>Cart</h1>
            </center>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Cart Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.cartQty}</td> 
                        </tr>
                    ))}

                </tbody>
            </table>


        </>
    )
}

export default Home