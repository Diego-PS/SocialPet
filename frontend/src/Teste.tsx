import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IPost } from './api/post/getAllPosts';
import { apiRoutes } from './api';
import { Header, Footer } from './Header-footer';
import './Teste.css';

export default function Teste() {
    const [posts, setPosts] = useState([] as IPost[]);

    const getPostsFromApi = async () => {
        try {
            const response = await apiRoutes.getAllPosts();
            const sortedPosts = response.data.posts.map(post => ({
                ...post,
                createdUTCDateTime: new Date(post.createdUTCDateTime) as any,
            })).sort((a, b) => (b.createdUTCDateTime as Date).getTime() - (a.createdUTCDateTime as Date).getTime());
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getPostsFromApi();
    }, []);

    const renderMedia = (post: IPost) => {
        if (post.mediaUrl) {
            // Check if the media is an image based on its file extension
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(post.mediaUrl);

            if (isImage) {
                return (
                    <img src={post.mediaUrl} alt={post.textContent || ''} />
                );
            } else {
                // It's assumed to be a video 
                return (
                    <video controls>
                        <source src={post.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            }
        }

        return null; // No media to render
    };

    const formatTimeAgo = (dateString: string) => {
        const currentTime = new Date();
        const postTime = new Date(dateString);
        const timeAgo = calculateTimeAgo(currentTime, postTime);
        return timeAgo;
    };

    const calculateTimeAgo = (currentTime: Date, postTime: Date) => {
        const diffInMilliseconds = currentTime.getTime() - postTime.getTime();
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (diffInMilliseconds < 60000) {
            return rtf.format(-Math.floor(diffInMilliseconds / 1000), 'second');
        } else if (diffInMilliseconds < 3600000) {
            return rtf.format(-Math.floor(diffInMilliseconds / 60000), 'minute');
        } else if (diffInMilliseconds < 86400000) {
            return rtf.format(-Math.floor(diffInMilliseconds / 3600000), 'hour');
        } else if (diffInMilliseconds < 604800000) {
            return rtf.format(-Math.floor(diffInMilliseconds / 86400000), 'day');
        } else {
            return rtf.format(-Math.floor(diffInMilliseconds / 604800000), 'week');
        }
    };

    return (
        <div className="Teste">
            <Header />
            <div className="content">
                {posts.map((post, index) => (
                    <div key={index}>
                        <div className="user-info">
                            <img className="user-photo" src={post.pet.profilePictureUrl} alt={post.pet.name} />
                            <p className="user-name">@{post.pet.nickname}</p>
                            
                        </div>
                        <div className="media">
                            {renderMedia(post)}
                            <p className="time-ago">{formatTimeAgo(post.createdUTCDateTime)}</p>
                            {post.textContent && <p className="caption">{post.textContent}</p>}
                            
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
