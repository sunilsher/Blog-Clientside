import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAction } from '../../store/slices/postSlice';
export default function Home() {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(fetchPostsAction())
    }, [])

    const {postsList, loading, error} = useSelector(state=>state.posts)

    return (
        <div>
                {
                    error && <h2>{error}</h2>
                }
                {
                    loading && <h2>Loading...</h2>
                    }
        </div>
    )
}
