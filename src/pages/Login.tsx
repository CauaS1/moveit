import styles from '../styles/pages/Login.module.css';

export function Login() {
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src="/icons/logo.svg" alt="Logo" />

        <h2>Bem-vindo</h2>
        <p>
          <img src="/icons/github.svg" alt="Github Icon" />
          Faça o login com seu Github <br />
          para começar
        </p>

        <div className={styles.inputContainer}>
          <input type="text" 
          placeholder="Digite um username" 
          />
          <button>
            <img src="/icons/right-arrow.svg" alt="Seta" />
          </button>
        </div>

      </div>
    </div>
  )
}