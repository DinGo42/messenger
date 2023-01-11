import { createCommentForm } from '../forms/commentForm/commentForm';
import {growAnimation} from './grow';
const isOpened = false;
export const postAnimation = (post,save_zone,comment_bar,comment_button,comments) => {
	// setTimeout(() => {
	post.onclick = (t) => {
		post.classList.add('growing');
		post.insertAdjacentElement('beforeend',comment_bar);
		console.log(2,t.target.closest('.post'));
	};
	
	// comment_button.onclick = () =>{
	//   console.log(2)
	// 	if(isOpened){
	//     isOpened = false;
	// 		comments.remove();
	// 	}
	// 	else{
	//     isOpened=true
	// 		comment_bar.insertAdjacentElement('beforeend',comments);
	// 	}
	// console.log(comment_bar,comments);

	// const comment_form = createCommentForm();
	// comments.insertAdjacentElement('beforeend',comment_form);
	// };
	// }, 0);
	// setTimeout(
	// 	() => 
  console.log(4)
	save_zone.addEventListener('click', (t) => {
    console.log(3,t.target)
    if(!t.target.closest('.post')){
      

    }
		post.classList.remove('growing');
		comment_bar.remove();
		// comments.remove();
	});
	// 	0,
	// );
};