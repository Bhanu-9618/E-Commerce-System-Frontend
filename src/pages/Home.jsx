import Navbar from '../components/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {

    const API = "http://localhost:8080";

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

        useEffect(() => {
            loadProducts();
        }, []);
    }

    return (
        <>
            <Navbar></Navbar>

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
                    {product.map((b) =>
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.name}</td>
                            <td>{b.description}</td>
                            <td>{b.unitPrice}</td>
                            <td>{b.qty}</td>
                            <td>
                                <input type="button" value="Add to Cart" />
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

        </>
    )
}

export default Home