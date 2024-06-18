import Header from "../../components/Header/Header";
import style from "./Contacts.module.css";

export function Contacts() {

    return (
        <div className={style.container}>
            <Header>Контакты</Header>
            <section className={style.map}>
                <div className={style.container}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.4377472322876!2d30.333197977300166!3d53.90619677245693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d051e0d8c46ca5%3A0xe64f8bfef56d28d9!2z0YPQu9C40YbQsCDQlNC30LXRgNC20LjQvdGB0LrQvtCz0L4gNSwg0JzQvtCz0LjQu9GR0LIsINCc0L7Qs9C40LvRkdCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sby!4v1718003616078!5m2!1sru!2sby" loading="lazy" height="500" className={style.mapp}></iframe>
                </div>
                <div className={style["number-container"]}>
                    <b>Адрес</b>
                    <span>Держинского, 5</span>
                </div>
                <div className={style["number-container"]}>
                    <b>Номер телефона</b>
                    <a href="tel:80447092409" className={style.number}>80447092409</a>
                </div>
                <div className={style["number-container"]}>
                    <b>Директор</b>
                    <span>Юрий Витальевич Костоломов</span>
                </div>
            </section>
        </div>
    );
}
