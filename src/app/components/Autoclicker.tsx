import {useState} from 'react';
import { Autoclicker as AutoclickerModel } from '../models/Autoclicker';
import styles from './Autoclicker.module.css';

export default function Autoclicker() {
    const [autoclicker] = useState<AutoclickerModel>(new AutoclickerModel());
    const [, forceUpdate] = useState({});

    const handleBuyAutoclicker = () => {
        autoclicker.buyAutoclicker();
        forceUpdate({});
    }
}
