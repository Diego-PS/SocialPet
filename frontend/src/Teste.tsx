import { useEffect, useState } from 'react';
import { IPost } from './api/post/getAllPosts';
import { apiRoutes } from './api';
import { Header, Footer } from './Header-footer';
import './Teste.css';

export default function Teste() {
    const [posts, setPosts] = useState([] as IPost[]);

    const getPostsFromApi = async () => {
        try {
            const response = await apiRoutes.getAllPosts();
            setPosts(response.data.posts);
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
                // It's assumed to be a video (adjust this logic if needed)
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
                            {post.textContent && <p className="caption">{post.textContent}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
