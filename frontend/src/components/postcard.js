import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import DoneIcon from "@mui/icons-material/Done";

function Post(props) {
  const styles = {
    div: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  const id = props.id; // post id
  // props.user is the current user

  const [postdata, setPostdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [isliked, setIsliked] = useState(false);
  const [isdisliked, setIsdisliked] = useState(false);
  const [author, setAuthor] = useState("User");
  const [text, setText] = useState("This is a  post!");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [savingpost, setSavingpost] = useState(false);
  const [issaved, setIssaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [sendingfollow, setSendingfollow] = useState(false);

  const [opencomment, setOpencomment] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [rendercount, setRendercount] = useState(0);

  const [likevar, setLikevar] = useState("link");
  const [dislikevar, setDislikevar] = useState("link");

  const fetchPost = async () => {
    const res = await fetch(`/post/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const temp = await res.json();
    setPostdata(temp);
    setAuthor(temp.user.firstName);
    setText(temp.post.text);
    setLikes(temp.post.upvotes.length);
    setDislikes(temp.post.downvotes.length);

    const values = temp.post.comments
      .map(({ username, text, _id, by }) => ({ username, text, _id, by }))
      .filter((val) => val !== undefined);
    setComments(values);

    setLoading(false);
  };
  useEffect(() => {
    if (props.userdata && props.userdata.savedposts) {
      const index =
        props.userdata.savedposts.findIndex((post) => post._id === id) === -1;
      setIssaved(!index);
      if (!index) setRendercount(1);
    }
  }, [props.userdata, id, savingpost]);
  useEffect(() => {
    if (props.userdata && props.userdata.following && postdata.post) {
      const index = props.userdata.following.findIndex(
        (user) => user._id === postdata.post.by
      );
      if (!index) setFollowing(true);
    }
  }, [props.userdata, postdata.post, sendingfollow]);

  const sendLike = async (like, unlike, dis, undis) => {
    const res = await fetch("/post/setlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: postdata.post._id,
        like,
        unlike,
        dis,
        undis,
      }),
    });

    const retData = await res.json();
    setLikes(retData.likes);
    setDislikes(retData.dislikes);
    if (res.status == 400) {
    } else {
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleLike = () => {
    if (!isliked) {
      sendLike(1, 0, 0, isdisliked);
      if (isdisliked) {
        setIsdisliked(false);
        setDislikevar("link");
      }
      setIsliked(true);
      setLikevar("primary");
    } else {
      sendLike(0, 1, 0, 0);
      setIsliked(false);

      setLikevar("link");
    }
  };
  const handleDislike = () => {
    if (!isdisliked) {
      sendLike(0, isliked, 1, 0);
      if (isliked) {
        setIsliked(false);
        setLikevar("link");
      }
      setIsdisliked(true);
      setDislikevar("danger");
    } else {
      setIsdisliked(false);
      sendLike(0, 0, 0, 1);
      setDislikevar("link");
    }
  };
  const showComments = () => {
    if (opencomment) setOpencomment(false);
    else setOpencomment(true);
  };

  const followuser = async () => {
    setSendingfollow(true);
    const res = await fetch("/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: postdata.post.by,
      }),
    });
    const retData = await res.json();
    setFollowing(!following);
    setSendingfollow(false);
  };

  const removeComment = async (id) => {
    const res = await fetch("/post/removecomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        postid: postdata.post._id,
      }),
    });
    const retData = await res.json();
    const values = retData.comments
      .map(({ username, text, _id, by }) => ({ username, text, _id, by }))
      .filter((val) => val !== undefined);
    setComments(values);
    if (res.status === 200) {
    } else {
    }
  };
  //todo : only remove ur own comments

  const savePost = async () => {
    setSavingpost(true);
    const res = await fetch("/post/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        posts: postdata.post,
        save: !rendercount,
      }),
    });

    if (rendercount == 0) setRendercount(rendercount + 1);
    else setRendercount(rendercount - 1);
    setIssaved(!issaved);

    setSavingpost(false);
    if (res.status === 200) {
    } else if (res.status === 409) {
    } else if (res.status === 204) {
    } else {
    }
  };

  const handleComment = async () => {
    const res = await fetch("/post/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        by: props.userdata._id,
        _id: postdata.post._id,
        comment: newComment,
      }),
    });
    const retData = await res.json();
    const values = retData.comments
      .map(({ username, text, _id, by }) => ({ username, text, _id, by }))
      .filter((val) => val !== undefined);
    setComments(values);
    setNewComment("");
    if (res.status === 200) {
    } else {
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };
  const handleHideComments = () => {
    setShowAllComments(false);
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 1);

  if (loading) {
    return <div>loading...</div>;
  }


  return (
    <>
      <Card style={{ backgroundColor: "#c3dbc5", marginTop: "13px" }}>
        <Card.Body>
          <div style={styles.div}>
            <div>
              <h3 style={{ display: "inline-block", margin: 3 }}>{author} </h3>
              <p style={{ display: "inline-block", margin: 3 }}> posted in</p>
              <h3 style={{ display: "inline-block", margin: 3 }}>
                {props.sub}
              </h3>
            </div>
            <div style={{ marginRight: "10px" }}>
              <Button
                style={{ height: "40px" }}
                variant="primary"
                disabled={savingpost}
                onClick={savePost}
              >
                {savingpost ? (
                  <Spinner size="sm" animation="border" role="status">
                    <span className="visually-hidden"> </span>
                  </Spinner>
                ) : rendercount == 0 ? (
                  "Save"
                ) : (
                  <DoneIcon />
                )

                // todo : save not working properly
                }
              </Button>
              {!following ? (!(props.userdata._id === postdata.post.by) ?(
                !sendingfollow ? (
                  <Button
                    onClick={followuser}
                    style={{ marginLeft: "10px", height: "40px" }}
                    variant="success"
                  >
                    Follow
                  </Button>
                ) : (
                  <Spinner size="sm" animation="border" role="status">
                    <span className="visually-hidden"> </span>
                  </Spinner>
                )
              ): <Button
              disabled
              onClick={followuser}
              style={{ marginLeft: "10px", height: "40px" }}
              variant="success"
            >
              Follow
            </Button>) : (
                <Button
                  disabled
                  onClick={followuser}
                  style={{ marginLeft: "10px", height: "40px" }}
                  variant="success"
                >
                  Following
                </Button>
              )}
            </div>
          </div>
          <hr></hr>

          <Card.Text>{text}</Card.Text>
          <hr />
          <div style={{ marginBottom: "10px" }}>
            <Button variant={likevar} onClick={handleLike}>
              Upvote ({likes})
            </Button>{" "}
            <Button variant={dislikevar} onClick={handleDislike}>
              Downvote ({dislikes})
            </Button>{" "}
            <Button
              onClick={() => {
                showComments();
              }}
              variant="link"
            >
              Comment ({comments.length})
            </Button>
          </div>

          {opencomment ? (
            <>
              {" "}
              {visibleComments.map((comment, index) => (
                <div key={index}>
                  <hr />
                  <h6>{comment["username"]}</h6>
                  <p>{comment["text"]}</p>
                  {comment.by === props.userdata._id ? (
                    <Button
                      variant="link"
                      onClick={() => {
                        removeComment(comment["_id"]);
                      }}
                    >
                      remove
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              {!showAllComments && comments.length > 1 && (
                <Button variant="link" onClick={handleShowAllComments}>
                  Show all {comments.length} comments
                </Button>
              )}
              {showAllComments ? (
                <Button variant="link" onClick={handleHideComments}>
                  Hide comments
                </Button>
              ) : (
                <></>
              )}
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleComment();
                }}
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={handleNewCommentChange}
                  />
                </Form.Group>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="primary"
                  onClick={handleComment}
                >
                  Post
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Post;
