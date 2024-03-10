import { useDispatch, useSelector } from "react-redux";
import { GroupBlock } from "./components/groupBlock/GroupBlock.tsx";
import { Filter } from "./components/filter/Filter.tsx";

import { AppDispatch, RootState } from "./redux/store.ts";

//прошу прощения за внешний вид, над стилями не заморачивался
import styles from "./scss/app.module.scss";
import "./App.css";
import { fetchGroups } from "./redux/groupSlice.ts";
import { useEffect } from "react";

export interface Group {
    id: number;
    name: string;
    closed: boolean;
    avatar_color?: string;
    members_count: number;
    friends?: User[];
}

export interface User {
    first_name: string;
    last_name: string;
}

export const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items: Group[] = useSelector((state: RootState) => state.group.items);
    const isLoading: string = useSelector(
        (state: RootState) => state.group.status,
    );

    const { privateTypeFilter, haveAvatarFilter, haveFriendsFilter } =
        useSelector((state: RootState) => state.filter);

    // В MocAPI не получилось применить необходимые нам фильтрации (не мой косяк)
    // (например проверка наличия avatar_color у группы)
    // Поэтому сначала мы получаем все группы (это реализовано в redux с помощью createAsyncThunk),
    // а затем применяем наши фильтры и выводим на страницу только необходимые нам группы
    const filterGroups = (groups: Group[]) => {
        return groups.filter((group) => {
            const matchesPrivateType =
                privateTypeFilter.filterProperty === undefined
                    ? true
                    : group.closed === privateTypeFilter.filterProperty;
            const matchesHaveAvatar =
                haveAvatarFilter.filterProperty === undefined
                    ? true
                    : !haveAvatarFilter.filterProperty
                      ? group.avatar_color !== undefined
                      : group.avatar_color === undefined;
            const matchesHaveFriends =
                haveFriendsFilter.filterProperty === undefined
                    ? true
                    : !haveFriendsFilter.filterProperty
                      ? group.friends && group.friends.length > 0
                      : !group.friends || group.friends.length === 0;

            return (
                matchesPrivateType && matchesHaveAvatar && matchesHaveFriends
            );
        });
    };

    // делаем задержку 1000мс
    // запрос на MocAPI добавляет небольшую задержку,
    // но по условию сказано 1000мс
    const getGroups = async () => {
        setTimeout(() => {
            dispatch(fetchGroups());
        }, 1000);
    };

    useEffect(() => {
        getGroups();
    }, []);

    const filteredItems: Group[] = filterGroups(items);

    return (
        <>
            <div className={styles.root}>
                <Filter />
                {isLoading !== "loading" ? (
                    filteredItems.map((item: Group) => (
                        <GroupBlock key={item.id} {...item} />
                    ))
                ) : (
                    <h2>Загрузка...</h2>
                )}
            </div>
        </>
    );
};
