import React, {useState} from 'react';
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown,} from "reactstrap";
import {A, navigate, usePath} from "hookrouter";
import "client/components/themes/main/navbar.sass"

export default function MenuTop(props) {
    const [menuPulled, pullMenu] = useState(false);
    const currentPath = usePath();

    function isActive(path) {
        return path === currentPath;
    }

    const items=[
        {label:'О нас', path:'/about'},
        {label:'Основатель школ М.Е.Николаев', path:'/founder'},
        {label:'Школы', path:'/schools'},
        {label:'Новости', path:'/news'},
        {label:'Содержание образования', path:'/content'},
        {label:'Стратегия развития', path:'/strategy'},
        {label:'План мероприятий', path:'/plan'},
    ]

    return <div>
        <div className="d-sm-flex d-none">
            {items.map((item,i)=><h4 key={i} className="blue-box p-2 m-2 d-flex align-content-center text-center" style={{flex:1}}><A className="m-auto" href={item.path}>{item.label}</A></h4>)}
        </div>
        <Navbar light expand="xl" className="top-menu d-block d-sm-none">
            <NavbarToggler onClick={e => pullMenu(!menuPulled)} className="dark"/>
            <Collapse isOpen={menuPulled} navbar>
                <Nav className="m-auto" navbar>
                    {items.map((item, i) => {
                        if (item.hidden) return <span key={i}></span>;
                        return item.items ? <UncontrolledDropdown nav inNavbar key={i}>
                                <DropdownToggle nav caret>
                                    {item.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {item.items.map((itemSub, i) => {
                                        const ps = itemSub.path ? {href: itemSub.path} : itemSub.onClick ? {href: '#', onClick: itemSub.onClick} : null
                                        return <DropdownItem key={i} disabled={!ps}>
                                            {ps ? <A {...ps} className={itemSub.className}>{itemSub.label}</A> : itemSub.label}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            :
                            <NavItem key={i} active={isActive(item.path)}>
                                <A href={item.path || '#'} onClick={item.onClick} className={'nav-link'}>{item.label}</A>
                            </NavItem>
                    })}


                    {/*<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Language')}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => langSwitch('ru')}>
                                    RU
                                </DropdownItem>
                                <DropdownItem onClick={() => langSwitch('en')}>
                                    EN
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>*/}

                </Nav>
            </Collapse>
        </Navbar>

    </div>
}

