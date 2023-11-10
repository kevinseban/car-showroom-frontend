import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";

function Profile()
{
    async function edit(){
        console.log("edit");
    }

    return(
        <div className="bg-dark">
            <Header/>
            <br/>
            <center>
                <h1 className="text-light">My Profile</h1>
                <br/>
            </center>
            <div>
                    <center>
                        <img className="image" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="profile"/>
                        <br/>
                    </center>
            </div>
                <div>
                <table cellpadding="10px" className="table table-borderless">
                    <tr>
                        <td><label className="form-label pe-5 text-light bg-dark">Full Name</label> </td>
                        <td> <input className="form-control rounded" type="text" placeholder="{Full name}"/></td>
                    </tr>
                    <tr>
                        <td><label className="form-label pe-5 text-light bg-dark">Username</label></td>
                        <td><input className="form-control rounded " type="text" placeholder="{Username}"/></td>
                    </tr>
                    <tr>
                        <td><label className="form-label pe-5 text-light bg-dark">Mobile No</label></td>
                        <td><input className="form-control rounded" type="number" placeholder="{Mob no}"/></td>
                    </tr>
                    <tr>
                        <td><label className="form-label pe-5 text-light bg-dark">Email</label></td>
                        <td><input className="form-control rounded" type="text" placeholder="{Email}"/></td>
                    </tr>
                    
                    <tr>
                        <td colspan="2" className="text-center"><button type="submit" className="btn btn-warning" onClick={edit}>Edit</button></td>
                        
                    </tr>
                </table>      
                </div>
                <Footer/>              
        </div>
        

    );
}

export default Profile;

