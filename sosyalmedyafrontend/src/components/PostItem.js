import React from 'react';

const PostItem = (props) => {

    const { post } = props;

    return (
        <div className="mt-2">
            <div className="card">
                <div className="card-body">
                    <p className="card-text">
                        {post.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostItem;