import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Button from '../../button/Button';
import {setCurrentBranch} from '../../../redux/actions/BranchActions';
import {Branch} from "../../../services/ComponentService";

function ThemeBranch() {
    const [themeBranches, setThemeBranches] = useState([]);

    const fetchBranch = async () => {
        try {
            const responseData = await Branch();
            setThemeBranches(responseData);

        } catch (error) {
            console.error('API 에러 :', error);
        }
    };

    const dispatch = useDispatch();
    const currentBranch = useSelector(state => state.themeBranch.currentBranch);

    const handleClick = (branch) => {
        dispatch(setCurrentBranch(branch));
    };

    useEffect(() => {
        fetchBranch();
    }, []);

    return (
        <ul className="theme_branches">
            {themeBranches.map((label, index) => (
                <li key={index} className="theme_branch">
                    <Button
                        type="button"
                        className={`theme_branch_btn ${currentBranch === label ? 'active' : ''}`}
                        onClick={() => handleClick(label)}
                        label={label}
                    />
                </li>
            ))}
        </ul>
    );
}


export default ThemeBranch;