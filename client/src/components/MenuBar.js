
import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const MenuBar = () => {

    const [activeItem, setActiveItem] = useState()
    const handleItemClick = (e, { name }) => setActiveItem(name)
    return (
            <Menu pointing secondary>
                <Menu.Item
                    name='Home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu>
    )
}
export default MenuBar;