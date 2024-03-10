import styles from "./groupBlock.module.scss";
import { useState } from "react";
import { Group } from "../../App.tsx";

export const GroupBlock = ({
    name,
    closed,
    avatar_color,
    members_count,
    friends,
}: Group) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.root}>
            {avatar_color && (
                <div
                    style={{ background: avatar_color }}
                    className={styles.picture}
                ></div>
            )}

            <div>
                <div className={styles.groupName}>
                    <b>{name}</b>
                </div>
                <div>Тип: {closed ? "Закрытый" : "Открытый"}</div>
                {members_count > 0 && <div>Участники: {members_count}</div>}
                <div>
                    {friends && (
                        <div
                            onClick={() => setOpen((prevState) => !prevState)}
                            className={styles.friendsNumber}
                        >
                            Друзья: {friends.length}
                            {open ? (
                                <svg
                                    viewBox="0 0 512 512"
                                    width="20px"
                                    height="20px"
                                >
                                    <path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z" />
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 512 512"
                                    width="20px"
                                    height="20px"
                                >
                                    <path d="M184.7,413.1l2.1-1.8l156.5-136c5.3-4.6,8.6-11.5,8.6-19.2c0-7.7-3.4-14.6-8.6-19.2L187.1,101l-2.6-2.3  C182,97,179,96,175.8,96c-8.7,0-15.8,7.4-15.8,16.6h0v286.8h0c0,9.2,7.1,16.6,15.8,16.6C179.1,416,182.2,414.9,184.7,413.1z" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
                {open && (
                    <ul className={styles.friendsList}>
                        {friends?.map((friend) => (
                            <li>
                                {friend.first_name + " " + friend.last_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
