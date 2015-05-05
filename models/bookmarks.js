var mongoose=require('mongoose');

module.exports=mongoose.model('Bookmarks',{
        username: String,
        bname: String,
		burl: String,
		btag: [String]
});	