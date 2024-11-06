import gh from '../../assets/icons/github.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.credits}>
        <div>
          Icon by{' '}
          <a
            href="https://www.flaticon.com/free-icons/message"
            title="message icons"
          >
            Freepik
          </a>
        </div>
        <div>
          Avatars by{' '}
          <a href="https://www.flaticon.com/free-icons/user" title="user icons">
            kmg design
          </a>
          <a
            href="https://www.flaticon.com/free-icons/penguin"
            title="penguin icons"
          >
            Kroffle
          </a>
          <a
            href="https://www.flaticon.com/free-icons/summer"
            title="summer icons"
          >
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/free-icons/gaming"
            title="gaming icons"
          >
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/free-icons/cooking"
            title="cooking icons"
          >
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/free-icons/basketball"
            title="basketball icons"
          >
            ranksol graphics
          </a>
          <a
            href="https://www.flaticon.com/free-icons/monster"
            title="monster icons"
          >
            juicy_fish
          </a>
          <a
            href="https://www.flaticon.com/free-icons/devil"
            title="devil icons"
          >
            iconixar
          </a>
          <a
            href="https://www.flaticon.com/free-icons/potential"
            title="potential icons"
          >
            Freepik
          </a>
          <a
            href="https://www.flaticon.com/free-icons/clapperboard"
            title="clapperboard icons"
          >
            Flat Icons
          </a>{' '}
          - Flaticon
        </div>
      </div>
      <div>
        Please keep in mind that this app is a learning project. Do not
        store/send any sensitive data/messages.
      </div>
      <div className={styles.cr}>
        © Noa Houssier{' '}
        <a
          href="https://github.com/NestorNebula"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gh} alt="" />
        </a>{' '}
        2024
      </div>
    </footer>
  );
}

export default Footer;
