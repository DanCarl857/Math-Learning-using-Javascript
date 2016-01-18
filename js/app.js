// TODO - code cleanup
			// 		- fix minute bugs
			// 		- look for work around to closing a tab in browser not opened by script
			//		- modularization of code
			//		- add sounds
			// 		- add effects
			// 		- add users and login system
			// 		- add server in nodeJs
			//		- level system
			// 		- code optimization

			// global variables
			var counterTime = 10;
			window.onload = initializeTimer(1);
			var c_ans = "";
			var score = 0;
			var num_question = 0;
			var skips = 0;
			var generated = 0;

			mainFunction = function(){
				getElem('score').value = score;
				num_question = num_question + 1;

				getElem('QuestAns').value = num_question;

				console.log("Number of questions: " + num_question);

				// exit modal info
				getElem('endScore').innerHTML = score;

				if(score > 0 && score <= 5)
					getElem('gradeScore').innerHTML = "F - Very Poor";
				else if(score > 5 && score <= 10)
					getElem('gradeScore').innerHTML = "C - Fair";
				else if(score > 10 && score <= 15)
					getElem('gradeScore').innerHTML = "B - Good";
				else if(score > 15 && score <= 19)
					getElem('gradeScore').innerHTML = "A - Very Good";
				else if(score == 20)
					getElem('gradeScore').innerHTML = "A+ - Excellent";
				else
					getElem('gradeScore').innerHTML = "Nothing Yet";

				// skip and generated info
				getElem('skipQuest').value = skips;
				getElem('generateQ').value = generated;


				var first_operand = Math.floor((Math.random() * 10) + 0);
				var second_operand = Math.floor((Math.random() * 10) + 0);

				var ops = ["+", "-", "/", "*"];
				var op = ops[Math.floor((Math.random() * 3) + 0)];

				// put question up on screen
				getElem('first_op').innerHTML = first_operand;
				getElem('operator').innerHTML = op;
				getElem('quest').innerHTML = second_operand;
				//getElem('ans').innerHTML = "?";

				var expr = String(first_operand);
				expr = expr + String(op);
				expr = expr + String(second_operand);

				console.log(expr);

				var ans = eval(expr);


				// if answer is not a floating point or an integer generate a new one
				if(isFloat(ans) || isInt(ans) || !isNaN(ans)){

					console.log(ans);

					//answers
					var possible = "ABCD";
					c_ans = possible.charAt(Math.floor(Math.random() * possible.length));

					console.log(c_ans);

					switch(c_ans){
						case 'A':
							clearAll();
							getElem('A').value = ans.toFixed(1);
							getElem('B').value = generateWrong1(ans);
							getElem('C').value = generateWrong2(ans);
							getElem('D').value = generateWrong(ans);
							break;
						case 'B':
							clearAll();
							getElem('B').value = ans.toFixed(1);
							getElem('A').value = generateWrong1(ans);
							getElem('C').value = generateWrong(ans);
							getElem('D').value = generateWrong2(ans);
							break;
						case 'C':
							clearAll();
							getElem('C').value = ans.toFixed(1);
							getElem('B').value = generateWrong2(ans);
							getElem('A').value = generateWrong1(ans);
							getElem('D').value = generateWrong(ans);
							break;
						case 'D':
							clearAll();
							getElem('D').value = ans.toFixed(1);
							getElem('B').value = generateWrong(ans);
							getElem('C').value = generateWrong1(ans);
							getElem('A').value = generateWrong2(ans);
							break;
					}

					if(num_question >= 20){
						closeTab();
					}
				} else {
					mainFunction();
				}
			}

			function clearAll(){
				getElem('A').value = '';
				getElem('B').value = '';
				getElem('C').value = '';
				getElem('D').value = '';
			}

			var secs;
			var timeID = null;
			var timerRunning = false;
			var delay = 1000;

			function initializeTimer(seconds){
				// set the length of the timer in seconds
				secs = seconds;
				StopTheClock();
				StartTheTimer();
			}

			function StopTheClock(){
				if(timerRunning)
					clearTimeout(timerID);
				timerRunning = false;
			}

			function StartTheTimer(){
				if(secs == 0){
					StopTheClock();

					//call mainFunction when timer is done.
					clockReset();
				} else {
					getElem('timer').innerHTML = secs + " secs";
					secs = secs - 1;
					timerRunning = true;
					timerID = self.setTimeout("StartTheTimer()", delay); 
				}
			}

			function clockReset(){
				StopTheClock();
				initializeTimer(counterTime);
				mainFunction();
			}

			function generateWrong(ans){
				var ret = ans * 2 + 4;
				return ret.toFixed(1);
			}
			function generateWrong1(ans){
				var ret = ans / 2 + 1;
				return ret.toFixed(1);
			}
			function generateWrong2(ans){
				var ret = ans + 2 - 1;
				return ret.toFixed(1);
			}

			function isInt(n){
				return n === +n && n !== (n|0);
			}

			function isFloat(n){
				return n === +n && n === (n|0);
			}

			function check(score){
				if(num_question == 20){
					hideModal("close");
				}else{
					return true;
				}
			}


			// simplify typing to get element
			function getElem(e){
				return document.getElementById(e);
			}

			var el = getElem('confirmNot');
			el.onclick = closeTab();

			function closeTab(){
				if(num_question == 20){
					$('#closeModal').modal('show');
					clockReset();
					score = 0;
					num_question = 0;
				} else if(num_question != 20){
					$('#closeModal').modal('hide');
				}
			}
			// screw it can't really figure out how to do this only once for now
			// atleast it works for now :-)
			var sub = getElem('submitMeA');
			sub.onclick = function() {
				if(c_ans == 'A'){
					if(check(num_question)){
						score++;
						hideModal("a");
					}
				} else{
					hideModal("a");
				}
			}

			var sub = getElem('submitMeB');
			sub.onclick = function() {
				if(c_ans == 'B'){
					if(check(num_question)){
						score++;
						hideModal("b");
					}
				} else{
					hideModal("b");
				}
			}

			var sub = getElem('submitMeC');
			sub.onclick = function() {
				if(c_ans == 'C'){
					if(check(num_question)){
						score++;
						hideModal("c");
					}
				} else{
					hideModal("c");
				}
			}

			var sub = getElem('submitMeD');
			sub.onclick = function() {
				if(c_ans == 'D'){
					++score;
					hideModal("d");
				} else{
					hideModal("d");
				}
			}

			var gen_quest = getElem('generate_question');
			gen_quest.onclick = function() {
				if(generated < 3 && num_question < 20){
					score = score - 2;
					generated++;
					hideModal("gen");
				} else{
					alert('Can no longer generate new questions.\nMaximum exceeded\nTry attempting a few :-)');
				}

			}

			var skip_quest = getElem('skip_quest');
			skip_quest.onclick = function(){
				if(skips < 5 && num_question < 20){
					skips++;
					hideModal("skip");
				} else {
					alert('Can no longer generate skip questions.\nMaximum exceeded!!!\nTry answering a few :-)');
				}
			}

			function hideModal(letter){
				var str = "#" + letter + "Modal";
				clockReset();
				$(str).modal('hide');
			}

			playSound = function(){
				
			}