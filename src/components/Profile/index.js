import React from 'react'
import CreatePost from './CreatePost/CreatePost'
import ProfileHeader from './ProfileHeader'
import {Button, Card, Container, Modal} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { fetchAllCategoriesAction } from '../../store/slices/categorySlice';

export default function Profile() {

    const { user } = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = React.useState(false);

    const handleCreatePostClick = () => {
        setOpenModal(true)
        dispatch(fetchAllCategoriesAction());
    };

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <Container>
            <Card className='p-4 w-100 d-flex justify-content-center'>
                <ProfileHeader user={user || {}} />
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='pt-4 text-muted'>My Posts</h4>
                    <Button onClick={handleCreatePostClick}>Create Post</Button>
                </div>
            </Card>
            <Modal show={openModal} onHide={handleClose}>
                <CreatePost close={handleClose} />
            </Modal>
        </Container>
    )
}
