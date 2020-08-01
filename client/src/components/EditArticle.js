import React, {useState, useEffect} from 'react'
import axios from "axios"

const EditArticle = (props) => {
    const [title, setTitle] = useState('');
    const [article,setArticle] = useState("");
    const [authorname,setAuthorName] = useState("");
    const [message, setMessage] = useState('')
    const changeOnClick = e => {
        e.preventDefault();

        const articles = {
            title,
            article,
            authorname
        };

        setTitle("")
        setArticle("")
        setAuthorName("")

        axios.put(`/articles/update/${props.match.params.id}`, articles)
         .then(res => setMessage(res.data))
         .catch(err => {
             console.log(err);
         });
    };

    useEffect(() => {
        axios.get(`/articles/${props.match.params.id}`)
        .then(res => [
            setTitle(res.data.title),
            setArticle(res.data.article),
            setAuthorName(res.data.authorname)
        ])
        .catch(Error => console.log(Error));
    }, []);


    return (
        <div>
          <div className="cont">  
  <form onSubmit = {changeOnClick} encType="multipart/form-data" id="contact" action="" method="post">
    <h3>Quick Contact</h3>
    <h4>{message}</h4>
    <fieldset>
      <input placeholder="Name" value={authorname} onChange={e => setAuthorName(e.target.value)} type="text" tabindex="1" required autofocus/>
    </fieldset>
    <fieldset>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} type="text" tabindex="2" required/>
    </fieldset>
 
    <fieldset>
      <textarea placeholder="Your Reviews" value={article} onChange={e => setArticle(e.target.value)} tabindex="5" required></textarea>
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
    </fieldset>
  </form>
 
  
</div>
</div>
        
    )
}

export default EditArticle;
