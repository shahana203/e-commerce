import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");

    // Add to Cart
    const addToCart = async (itemId, colors) => {
        if (!colors) {
            toast.error("Select product Color");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][colors]) {
                cartData[itemId][colors] += 1;
            } else {
                cartData[itemId][colors] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][colors] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, colors },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, colors, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][colors] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, colors, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0 && iteminfo) {
                        totalAmount += iteminfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    };

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        setShowSearch,
        showSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
