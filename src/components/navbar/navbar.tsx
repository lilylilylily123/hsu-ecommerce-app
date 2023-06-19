import styles from './navbar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {useState} from "preact/compat";
import ItemCard from "../itemcard/itemcard.tsx";

type Item = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}
export default function Navbar() {
    const [currentCart, setCurrentCart] = useState([] as Item[]);
    const [show, setShow] = useState(false);
    const showCart = async () => {
        setShow(!show)
        console.log("show cart");
        const cart = localStorage.getItem("cart");
        if (cart) {
            const parsedCart = JSON.parse(cart);
            console.log(parsedCart);
            for (let i = 0; i < parsedCart.length; i++) {
                await fetch(`https://fakestoreapi.com/products/${parsedCart[i].id}`)
                    .then(response => response.json())
                    .then(data => {
                        currentCart.filter(item => item.id === data.id).length === 0 &&
                        setCurrentCart(prevCart => [...prevCart, data]);
                    })
            }
        } else {
            alert("Cart is empty")
        }
    };
    return (
        <>
        <div class={styles.navbar}>
            <FontAwesomeIcon icon={faHome} size={"2x"} className={"ml-6"} />
            <button onClick={() => showCart()}>
            <FontAwesomeIcon icon={faCartArrowDown} size={"2x"} className={"mr-6"}  />
            </button>
        </div>
    {show && <div class={"mt-[12vh] scale-95 border-2 rounded-2xl flex bg-red-950 justify-center items-center flex-col"}>
        {currentCart.map(item => (
            <ItemCard removebtn={true} cart={false} key={item.id} item={item} />
        ))}
    </div>}
    </>
    )
}