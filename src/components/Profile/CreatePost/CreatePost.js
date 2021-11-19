import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CreatePost = ({close}) => {
    const {categoriesList} = useSelector(state=>state.categories);
    return <div className="container card p-2">
        <div className="card-header">
            Create Post
        </div>
        <div className="card-body">
            <form>
                <input type='text' placeholder='Title' name='title' className="form-control mb-2" />
                <textarea rows="6"  placeholder='Post Content' name='content' className="form-control mb-2" />
                <Form.Select className='mb-4'>
                    <option>--Select Category--</option>
                    {categoriesList.map(category=>{
                       return <option value={category._id}>{category.title}</option>
                    })}
                </Form.Select>
                <button type="button" onClick={close} className="btn btn-danger">Cancel</button>&nbsp;
                <button type='submit' className="btn btn-info">Create</button>
            </form>
        </div>
    </div>
}

export default CreatePost;