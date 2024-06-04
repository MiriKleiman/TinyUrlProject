import LinkModel from "../Models/LinkModel.js";


const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await LinkModel.find();//ללא סינון
      res.send(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
        await LinkModel.find({_id:req.params.id})
      const link = await LinkModel.findById(req.params.id);//שליפה לפי מזהה
      if(!link)
       return res.status(400).json({ message: e.message });
     const targetParamValue=req.query[link.targetParamName]||''
    
      const click= {
        insertedAt: new Date(),
        ipAddress:req.ip,
        targetParamValue:req.targetParamValue
      }
      link.clicks.push(click)
      await link.save()
      console.log(link.originUrl)
      res.redirect(link.originUrl)
    //   res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    try {
    const link =new LinkModel(req.body);
    await link.save();
    // const user = await user.findById( link.userId)
    // if(!user){
    //     return res.status(400).json({ message: e.message });
    // }
    // user.links.push(link._id)
    // await user.save()
    //   res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {new:true});//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await LinkModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  redirection: async (req, res) => {
    try {
        const { t } = req.query
        console.log("t " + t);
        const { shortUrl } = req.params
        console.log("shortUrl:" + shortUrl);
        const link = await LinkModel.findOne({ newUrl: shortUrl })
        console.log(link);
        const filterTargets=link.targetValues.filter(tar=>tar.value==t)
        console.log(filterTargets);
        if (link !=null&&filterTargets.length>0) {
            const clicks = link.clicks
            if (clicks.length == 0) {
                console.log(clicks.length);
                clicks.push({ id: 1, clickDate: Date.now(), ipAddress: req.socket.localAddress, targetParamValue: t })
                link.save()
                //res.json(clicks)
                res.redirect(link.originUrl)
            }
            else {
                const len = clicks[clicks.length - 1].id
                console.log("len " + len);
                clicks.push({
                    id: len + 1, clickDate: Date.now(), ipAddress: req.socket.localAddress,
                    targetParamValue: t
                })
                link.save()
                //res.json(clicks)
                res.redirect(link.originUrl)
            }
            
        }
        else{
             res.status(404).json({ message: 'URL not found' });
        }

    
    }
    catch (error) {
        console.log("eee");
        res.status(400).json({ message: error.message })
    }

},
//   getLinkListBySource: async (req, res) => {
//     try{
//         const link = await LinkModel.findById(req.params.id);//שליפה לפי מזהה
//       if(!link)
//        return res.status(400).json({ message: e.message });
//        link.target

       getLinkClicksBySource: async (req, res) => {
        const { id } = req.params;
    
        try {
            const link = await LinkModel.findById(id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
    
            const clicks = link.clicks;
            const clicksBySource = {};
    
            link.targetValues.forEach((source) => {
                clicksBySource[source.name] = clicks.filter((click) => click.targetParamValue === source.value).length;
            });
    
            res.status(200).json(clicksBySource);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // }
    // catch{}
//   }
};


export default LinksController;
