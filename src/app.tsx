import styles from "./app.module.scss"
import Navbar from "./components/navbar/navbar.tsx";
import MainView from "./components/mainview/mainview.tsx";

export function App() {
    return (
        <div class={styles.app}>
            <Navbar />
            <MainView />
        </div>
    )
}
