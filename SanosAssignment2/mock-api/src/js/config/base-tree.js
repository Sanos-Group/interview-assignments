const questionNode = (question, answers) => ({
  getQuestion: () => question,
  getAnswers: () => Object.fromEntries(
      answers.map(
          ({
             key, label, response, nextQuestion
           }) => [key, {
            label,
            getChild: () => ({response, question: nextQuestion})
          }]
      )
  )
});

const didYouKnowNode = questionNode('Did you know that after 24 hours smoking with your nuumi only instead of cigarettes, the carbon monoxide will be excreted from your body and your lungs will begin to clean themselves.', [
  {
    key: 'yes',
    label: 'Yes, I did'
  },
  {
    key: 'no',
    label: 'No, I didn\'t'
  }
]);

const howMuchDidYouSmokeNode = questionNode('That is ok. Just try to smoke as much as possible with your nuumi! Please, let me know how much you smoked, so I can prepare a nicotine reduction plan for you.', [
  {
    key: '<5',
    label: '<5',
    nextQuestion: didYouKnowNode
  },
  {
    key: '<10',
    label: '<10',
    nextQuestion: didYouKnowNode
  },
  {
    key: '<15',
    label: '<15',
    nextQuestion: didYouKnowNode
  },
  {
    key: '15+',
    label: '15+',
    nextQuestion: didYouKnowNode
  }
]);

const haveYouSmokedYesterdayNode = questionNode('Tell me one thing, have you smoked a cigarette yesterday?', [
  {
    key: 'yes',
    label: 'Yes, I smoked a cigarette',
    nextQuestion: howMuchDidYouSmokeNode
  },
  {
    key: 'no',
    label: 'No, I didn\'t',
    response: 'Awesome!'
  }
]);

const root = {
  question: questionNode(
      'How do you feel today?',
      [
        {
          key: 'good',
          label: 'Good',
          response: 'Great!',
          nextQuestion: haveYouSmokedYesterdayNode
        }, {
        key: 'okay',
        label: 'Okay',
        response: 'Ah, ok',
        nextQuestion: haveYouSmokedYesterdayNode
      }, {
        key: 'bad',
        label: 'Bad',
        response: 'That\'s a pity. But you know it is totally normal at the beginning to feel a bit of struggle. It becomes better, I promise!',
        nextQuestion: haveYouSmokedYesterdayNode
      }
      ])
};
root.getGreeting = () => [
  'Good morning, welcome to your first Check-in with your Coach.'
];

module.exports = {
  root
};
