import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import SideMenuItem from "./SideMenuItem";
import {
    TbBoxSeam,
    TbVocabulary,
    TbCalendar,
    TbBrandLinktree,
    TbClockCancel,
    TbAdjustmentsHorizontal
} from "react-icons/tb";
import {BsPeople, BsPersonAdd} from "react-icons/bs";
import {MdOutlineInventory} from "react-icons/md";
import {FiDownload} from "react-icons/fi";

// 리포트
const reportDailyOption = [
    {
        id: '1',
        subtitle: 'Daily Channel',
        navLinks: [
            {
                to: '/report/daily_channel',
                label: 'Channel',
                icon: <MdOutlineInventory/>,
            },
        ]
    },
    {
        id: '2',
        subtitle: 'Daily Store',
        navLinks: [
            {
                to: '/report/daily_store',
                label: 'Store',
                icon: <MdOutlineInventory/>,
            },
        ]
    },
]

const reportMonthlyOption = [
    {
        id: '1',
        subtitle: 'Channel',
        navLinks: [
            {
                to: 'report/monthly_channel',
                label: 'Channel',
                icon: <MdOutlineInventory/>,
                onClick: () => alert('준비중 입니다.'),
            },
        ]
    },
    {
        id: '2',
        subtitle: 'Store',
        navLinks: [
            {
                to: 'report/monthly_store',
                label: 'Store',
                icon: <MdOutlineInventory/>,
                onClick: () => alert('준비중 입니다.'),
            },
        ]
    },
    {
        id: '3',
        subtitle: 'FBA/FBM',
        navLinks: [
            {
                to: '/report/monthly_seller',
                label: 'FBA/FBM',
                icon: <MdOutlineInventory/>,
            },
        ]
    },
]

// 인벤토리
const inventoryOption = [
    {
        id: '1',
        subtitle: 'FBA',
        navLinks: [
            {
                to: '/inventory/fba_stock',
                label: 'FBA',
                icon: <TbBoxSeam/>,
            },
        ]
    },
    // {
    //     id: '2',
    //     subtitle: 'FBM',
    //     navLinks: [
    //         {
    //             to: '/inventory/FBM',
    //             label: 'FBM',
    //             icon: <TbBoxSeam/>,
    //             onClick: () => alert('준비중 입니다.'),
    //         },
    //     ]
    // },
    // {
    //     id: '3',
    //     subtitle: 'Shopify',
    //     navLinks: [
    //         {
    //             to: '/inventory/Shopify',
    //             label: 'Shopify',
    //             icon: <TbBoxSeam/>,
    //             onClick: () => alert('준비중 입니다.'),
    //         },
    //     ]
    // },
];

function SideMenu(props) {
    const { onMenuBgClick } = props;
    const [userInfoGrant, setUserInfoGrant] = useState(localStorage.getItem('userInfoGrant'));

    useEffect(() => {
        // 이 함수는 로컬 스토리지가 변경될 때마다 호출됩니다.
        const handleStorageChange = () => {
            setUserInfoGrant(localStorage.getItem('userInfoGrant'));
        };

        // 스토리지 이벤트 리스너 추가
        window.addEventListener('storage', handleStorageChange);

        // 클린업 함수에서 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const manager = () => {
        return userInfoGrant === '1' || userInfoGrant === '2';
    };

    const menuList = [
        {
            title: 'Members',
            navLinks: [
                {
                    to: '/member/memberList',
                    label: 'Member List',
                    icon: <BsPeople/>,
                },
                manager() ? {
                    to: '/member/approval',
                    label: 'signUp Approval',
                    icon: <BsPersonAdd/>,
                } : null,
            ].filter(Boolean),
        },
        {
            title: 'Report',
            icon: <MdOutlineInventory/>,
            dropdowns: [
                {
                    title: 'Monthly',
                    options: reportMonthlyOption,
                },
                {
                    title: 'Daily',
                    options: reportDailyOption,
                },
            ],
        },

        {
            title: 'Accounting',
            icon: <MdOutlineInventory/>,
            navLinks: [
                {
                    to: '/report/excel_down',
                    label: 'Download Excel',
                    icon: <FiDownload/>,
                },
            ],
        },
        // {
        //     title: 'Products',
        //     navLinks: [
        //         {
        //             to: '/products',
        //             label: 'Products',
        //             icon: <BiGift/>,
        //         },
        //     ],
        // },
        {
            title: 'Inventory',
            icon: <TbBoxSeam/>,
            dropdowns: [
                {
                    title: 'Inventory',
                    options: inventoryOption,
                },
            ],
        },
    ];

    return (
        <>
            <div className="side_menu">
                <div className="logo">
                    <Link className="go_to" to="/">
                        <img className="logo_img"
                             src="https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/logo5.png"
                             alt="logo"
                        />
                        <span className="logo_text">OMS</span>
                    </Link>
                </div>
                <div className="menu_list">
                    {menuList.map((menuItem, index) => (
                        <SideMenuItem key={index} title={menuItem.title} icon={menuItem.icon} navLinks={menuItem.navLinks}
                                      dropdowns={menuItem.dropdowns}/>
                    ))}
                </div>
            </div>
            <div className="m_side_menue_bg" onClick={onMenuBgClick}></div>
        </>
    );
}

SideMenu.propTypes = {
    onMenuBgClick: PropTypes.func.isRequired
};

export default SideMenu;