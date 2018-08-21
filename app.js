var express = require("express"),
    passport = require("passport"),
    LocalStrategy= require("passport-local"),
    mongoose=require("mongoose"),
      User = require("./model/user"),
      Order=require("./model/order"),
      priceCheck=require("./model/itemPrice"),
        bodyParser=require("body-parser"),
        app= express();
app.use(bodyParser.urlencoded({extended: true}));    
mongoose.connect("mongodb://localhost:27017/bestwing_online_app",{ useNewUrlParser: true });
app.set("view engine","ejs");

app.use(express.static("public"));

//Passport configuration
app.use(require("express-session")({
     secret:"I really really miss you ",
     resave:false,
     saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// priceCheck.create({itemName:30,price:12.49},function(err,price){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(price);
//     }
// });
app.get("/",function(req, res) {
    res.redirect("index");
})

app.get("/index",function(req,res){
   res.render("index");
    
});
app.get("/new_online_order",function(req, res) {
    res.render("online_order");
});

app.get("/wings",function(req, res) {
    res.render("wing");
})
app.get("/menu",function(req, res) {
    res.render("menu")
});
app.get("/location",function(req, res) {
    res.render("location")
});
app.get("/shoppingCart",function(req, res) {
    
    res.render("shoppingCart")
});

app.post("/shoppingCart",function(req, res) {
    var totalQuantity=req.body.TotalQuantity;
    console.log(totalQuantity);
    var wingPrice=priceCheck.findOne({itemName:totalQuantity},function(err,wingPrice){
        if(err){
            console.log(err);
        }else{
    Order.create({totalQuantity:req.body.TotalQuantity,price:wingPrice.price},
    function(err,order){
        if(err){
            console.log(err)
        }else{
            
            
            res.render("shoppingCart",{order:order,data:req.body});
            if(req.user){
                console.log(req.user);
            }
        }
    })
            
        }
    })
    

})

//sign in form
app.get("/login",function(req, res) {
    res.render("logIn");
     console.log(req.body);
});
//sign up logic 
app.post("/login",passport.authenticate("local",
{
    successRedirect: "/userProfile",
    failureRedirect:"/login"
    
}), function(req, res) {
 
    
})


//sign up form
app.get("/signUp",function(req, res) {
    res.render("signUp")
});
//sign up logic
app.post("/signUp",function(req,res){
    var newUser=new User({username:req.body.username});
    console.log(req.body);
    console.log(req.body.password);
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("/signUp");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/login");
            })
        }
    }   )
});

//logIn user Profile
app.get("/userProfile",isLoggedIn,function(req, res) {
    res.render("userProfile");
})

//logOut 
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
})

app.post("/checkout",function(req, res) {
    console.log(req.body.total);
    console.log(req.body);
    res.render("checkout",{amount:req.body.total});
})
app.post("/paid",function(req, res) {
    res.send("Thank you Your order is going to be ready in 10mins!"
    +"<br>Of course it is not going to charge your real credit card.");
})

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Bestwing Server is running");
});
