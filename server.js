const express=require('express'),axios=require('axios'),cors=require('cors');require('dotenv').config();
const app=express();app.use(cors());app.use(express.json());

app.post('/api/generate',async(req,res)=>{
    const {prompt,type}=req.body;let sysMsg="You are a professional Global AI Assistant. Help the user with high-quality, academic, or technical responses.";
    let finalPrompt="";
    
    switch(type){
        case 'seo':finalPrompt=`Perform a deep SEO audit, provide LSI keywords, and content gaps for: ${prompt}`;break;
        case 'viral':finalPrompt=`Generate 5 viral content hooks and ideas for social media based on: ${prompt}`;break;
        case 'scispace':finalPrompt=`Act as SciSpace AI: Explain hypotheses, results, and research gaps in simple terms for: ${prompt}`;break;
        case 'notebook':finalPrompt=`Act as NotebookLM: Summarize deeply and generate 5 critical thinking questions for: ${prompt}`;break;
        case 'humanize':finalPrompt=`Humanize this AI text. Rewrite it to pass AI detectors with a natural, emotive human flow: ${prompt}`;break;
        case 'plagiarism':finalPrompt=`Check this text for originality. Suggest edits to avoid plagiarism: ${prompt}`;break;
        case 'debug':finalPrompt=`Act as a senior developer. Fix bugs and optimize this code: ${prompt}`;break;
        case 'security':finalPrompt=`Act as a Cyber Security auditor. Scan this for vulnerabilities: ${prompt}`;break;
        default:finalPrompt=prompt;
    }

    try{
        const response=await axios.post('https://api.openai.com/v1/chat/completions',{
            model:"gpt-4o-mini", // سريع واقتصادي وعالي الجودة
            messages:[{role:"system",content:sysMsg},{role:"user",content:finalPrompt}],
            temperature:0.7
        },{headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`}});
        res.json({result:response.data.choices[0].message.content});
    }catch(e){res.status(500).json({error:"API Connection Failed"}) }
});
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Jet Engine Running on port ${PORT}`));