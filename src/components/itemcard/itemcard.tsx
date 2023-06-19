type Item = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

export default function ItemCard( {item, cart, removebtn} : {item: Item, cart: boolean, removebtn: boolean} ) {
    const addToCart = (id: number) => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const parsedCart = JSON.parse(cart);
            const item = parsedCart.find((item: Item) => item.id === id);
            if (item) {
                item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(parsedCart));
            } else {
                parsedCart.push({id, quantity: 1});
                localStorage.setItem("cart", JSON.stringify(parsedCart));
            }
        } else {
            localStorage.setItem("cart", JSON.stringify([{id, quantity: 1}]));
        }
    }
    const getQuantity = (id: number) => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const parsedCart = JSON.parse(cart);
            const item = parsedCart.find((item: Item) => item.id === id);
            if (item) {
                return item.quantity;
            }
        }
        return 0;
    }
    const removeFromCart = (id: number) => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const parsedCart = JSON.parse(cart);
            const item = parsedCart.find((item: Item) => item.id === id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    const newCart = parsedCart.filter((item: Item) => item.id !== id);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    window.location.reload();
                } else {
                    localStorage.setItem("cart", JSON.stringify(parsedCart));
                    window.location.reload();
                }
            }
        }
    }
    return (
        <div class={"m-[1.5vw] p-5 w-fit flex flex-col items-center justify-center rounded-2xl border-black border-[3px]"}>
            <img src={item.image} alt={item.title} class={"rounded-2xl h-[10vw] w-[10vw]"} />
            <div class={"flex flex-col items-center justify-center"}>
                <h1 class={"text-2xl font-bold"}>{item.title}</h1>
                {cart && <button onClick={() => addToCart(item.id)} class={"bg-black text-white rounded-2xl p-2 m-2"}>Add to cart</button>
                }
                {removebtn && <button onClick={() => removeFromCart(item.id)} class={"bg-black text-white rounded-2xl p-2 m-2"}>Remove from cart (quantity: {getQuantity(item.id)})</button>}
            </div>
        </div>
    )
}