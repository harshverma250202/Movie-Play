import styles from './UpgradePopup.module.css';
import { Button } from '@mui/material';

const UpgradePopup = () => {
    return (
        <div className={styles.container}>
            <div className={styles.Box}>
                <p>Upgrade your plan to continue to watch</p>
                <Button variant="contained" className={styles.button} onClick={() => useNavigate("/subscription")}>Upgrade</Button>
            </div>
        </div>
    );
}

export default UpgradePopup;