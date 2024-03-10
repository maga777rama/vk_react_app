import styles from "./filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { useEffect, useRef, useState } from "react";
import {
    setPrivateType,
    setHaveAvatar,
    setHaveFriends,
    resetFilters,
} from "../../redux/filterSlice.ts";

export interface filterList {
    name: string;
    filterProperty: boolean | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const privateTypeList: filterList[] = [
    { name: "Неважно", filterProperty: undefined },
    { name: "Открытый", filterProperty: false },
    { name: "Закрытый", filterProperty: true },
];
// eslint-disable-next-line react-refresh/only-export-components
export const haveFriendsList: filterList[] = [
    { name: "Неважно", filterProperty: undefined },
    { name: "Да", filterProperty: false },
    { name: "Нет", filterProperty: true },
];
// eslint-disable-next-line react-refresh/only-export-components
export const haveAvatarList: filterList[] = [
    { name: "Неважно", filterProperty: undefined },
    { name: "Да", filterProperty: false },
    { name: "Нет", filterProperty: true },
];

export const Filter = () => {
    const dispatch = useDispatch();
    const { privateTypeFilter, haveAvatarFilter, haveFriendsFilter } =
        useSelector((state: RootState) => state.filter);

    const [showPrivateType, setShowPrivateType] = useState(false);
    const [showHaveAvatar, setShowHaveAvatar] = useState(false);
    const [showHaveFriends, setShowHaveFriends] = useState(false);

    const popup1 = useRef<HTMLUListElement>(null);
    const popup2 = useRef<HTMLUListElement>(null);
    const popup3 = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popup1.current && !popup1.current.contains(e.target as Node)) {
                setShowPrivateType(false);
            }
            if (popup2.current && !popup2.current.contains(e.target as Node)) {
                setShowHaveAvatar(false);
            }
            if (popup3.current && !popup3.current.contains(e.target as Node)) {
                setShowHaveFriends(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className={styles.root}>
            <div>
                <b>Тип приватности:</b>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowPrivateType(!showPrivateType);
                        setShowHaveAvatar(false);
                        setShowHaveFriends(false);
                    }}
                >
                    {privateTypeFilter.name}
                </span>

                {showPrivateType && (
                    <ul className={styles.popup} ref={popup1}>
                        {privateTypeList.map((obj: filterList, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setShowPrivateType(false);
                                    dispatch(setPrivateType(obj));
                                }}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <b>С аватаркой:</b>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowHaveAvatar(!showHaveAvatar);
                        setShowHaveFriends(false);
                        setShowPrivateType(false);
                    }}
                >
                    {haveAvatarFilter.name}
                </span>
                {showHaveAvatar && (
                    <ul className={styles.popup} ref={popup2}>
                        {haveAvatarList.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setShowHaveAvatar(false);
                                    dispatch(setHaveAvatar(obj));
                                }}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <b>Есть друзья:</b>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowHaveFriends(!showHaveFriends);
                        setShowPrivateType(false);
                        setShowHaveAvatar(false);
                    }}
                >
                    {haveFriendsFilter.name}
                </span>
                {showHaveFriends && (
                    <ul className={styles.popup} ref={popup3}>
                        {haveFriendsList.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    dispatch(setHaveFriends(obj));
                                    setShowHaveFriends(false);
                                }}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(resetFilters());
                        setShowPrivateType(false);
                        setShowHaveFriends(false);
                        setShowHaveAvatar(false);
                    }}
                >
                    Сброс
                </button>
            </div>
        </div>
    );
};
