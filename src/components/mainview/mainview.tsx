import {useEffect, useState} from "preact/compat";
import ItemCard from "../itemcard/itemcard.tsx";

type Item = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}


export default function MainView() {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([] as Item[]);
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`https://fakestoreapi.com/products?limit=30`);
            const data = await response.json();

            setItems(prevItems => [...prevItems, ...data]);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        fetchData().then(r => console.log(r));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);
    useEffect(() => {
        fetchData().then(r => console.log(r));
    }, []);
    return (
        <div class={"mt-[6vw] flex flex-col items-center justify-self-center self-center content-center "}>
                {items.map(item => (
                    <ItemCard removebtn={false} cart={true} key={item.id} item={item} />
                ))}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}