export let years: number[] = []
const day = new Date();
const nowYear = day.getFullYear();
const startYear = 2013;
for(let i = startYear; i <= nowYear; i++){
    console.log(i);
    years.push(i);
}

export const cools = [
    {id: 1 , title: '冬'},
    {id: 2 , title: '春'},
    {id: 3 , title: '夏'},
    {id: 4 , title: '秋'},
]