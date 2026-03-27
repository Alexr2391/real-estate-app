import { Header } from './components/Header/Header';
import css from './page.module.scss';

export default function DashBoard() {
  return (
    <section className={css.container}>
      <div className={css.headerSection}>
        <Header />
      </div>
    </section>
  );
}
