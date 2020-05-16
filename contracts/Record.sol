pragma solidity >=0.4.21 <0.7.0;
contract Record
{
   
      //structure for the user or patient model
    struct user{
        uint patid;
        string accountname; //user name
        string password;    //user password
        address useraddress; //user ethereum address
        bool set;
        string lat;
        string lang;
    }
    struct permission{
        address doc;
        bool set;
    }
    mapping(address => permission) permissionlist;
    function askPermission(address _useraddress,address _doctoraddress) public{
        permissionlist[_useraddress]=permission(_doctoraddress,false);
    }
    function showPermission(address _useraddress) public view returns(address){
        return permissionlist[_useraddress].doc;
    }
    function addPermission(address _useraddress,address _doctoraddress) public{
        permissionlist[_useraddress]=permission(_doctoraddress,true);
    }
     function removePermission(address _useraddress,address _doctoraddress) public{
        permissionlist[_useraddress]=permission(_doctoraddress,false);
    }
    function getPermisson(address _useraddress) public view returns(address){
        return permissionlist[_useraddress].doc;
    }
    function gotPermission(address _useraddress,address _doctoraddress)public view returns(bool)
    {
        if(permissionlist[_useraddress].doc==_doctoraddress && permissionlist[_useraddress].set==true)
            return true;
        else
            return false;
    }
    //structure for heart disease
    struct heart{
        string diseases;
    }
    mapping(address=>heart) public heartlist;
      //add heart disease output
    function addheart(address _useraddress,string memory _recordhash) public
    {
        heartlist[_useraddress]=heart(_recordhash);
    }
    function getheart(address _useraddress) public view returns(string memory){
        return heartlist[_useraddress].diseases;
    }
   
   
    //structure for malaria disease
    struct malaria{
        string diseases;
    }
    mapping(address=>malaria) public malarialist;
      //add malaria disease output
    function addMalaria(address _useraddress,string memory _recordhash) public
    {
        malarialist[_useraddress]=malaria(_recordhash);
    }
    function getMalaria(address _useraddress) public view returns(string memory){
        return malarialist[_useraddress].diseases;
    }
   //structure for kidney disease
    struct kidney{
        string diseases;
    }
    mapping(address=>kidney) public kidneylist;
      //add kidney disease output
    function addKidney(address _useraddress,string memory _recordhash) public
    {
        kidneylist[_useraddress]=kidney(_recordhash);
    }
    function getKidney(address _useraddress) public view returns(string memory){
        return kidneylist[_useraddress].diseases;
    }
   
    //structure for liver disease
    struct liver{
        string diseases;
    }
    mapping(address=>liver) public liverlist;
      //add liver disease output
    function addLiver(address _useraddress,string memory _recordhash) public
    {
        liverlist[_useraddress]=liver(_recordhash);
    }
    function getLiver(address _useraddress) public view returns(string memory){
        return liverlist[_useraddress].diseases;
    }
   
    uint public userCount=0; //number of user or patient registered
     
    mapping(address => user)  public userlist;
   
    //return the user name by mapping the address
    function find_user_name(address  _address) public view returns(string memory){      
      return userlist[_address].accountname;
    }
   
     //return the user name by mapping the address
    function find_user_password(address  _address) public view returns(string memory){      
      return userlist[_address].password;
    }
   
 
    //add user's name, ethereum address and password
    function addUser(string memory _accountname,string memory _password, address  _useraddress,bool _userset,string memory _lat,string memory _lang) public{
        user storage User = userlist[_useraddress];
        require(!User.set);
        uint ui=incrementcount();   //keep count of no. of registered user
        ui=ui-1;
        userlist[_useraddress]=user(ui,_accountname,_password,_useraddress,_userset,_lat,_lang);
         count.push(0);
    }
    function getUserDetails(address _useraddress) public view returns(string memory _lat,string memory _lang){
     _lat=userlist[_useraddress].lat;
     _lang=userlist[_useraddress].lang;
    }
 
   
    //increments every time to keep track of registered user
     function incrementcount()   public returns(uint ){
        return userCount+=1;
    }
   
   
   
        //structure for the doctor
    struct doctor{
        string doctorname; //doctor name
        string password;    //doctor password
        address doctoraddress; //doctor ethereum address
     
        bool set; //to check whether doctor exist
    }
     uint[] count;
    //structure ro store record
    struct record{
    address patientaddress;
     string  recordHash;
    }
   
    event HospitalAddition(address hospital);
   
    mapping (address => bool) public isHospital;
    mapping(address => doctor)  public doctorlist;
    mapping(address => mapping(uint => record)) recordList;
   
     function addHospital(address _hospital)   public
    {
        isHospital[_hospital] = true;
        emit HospitalAddition(_hospital);
    }
   
   
    function addDoctor(string memory _doctorname,string memory _password, address  _doctoraddress,bool _doctorset) public{
         doctor storage Doctor = doctorlist[_doctoraddress];
    // Check that the doctor did not already exist:
         require(!Doctor.set);
        doctorlist[_doctoraddress]=doctor(_doctorname,_password,_doctoraddress,_doctorset);
    }
   
    function addRecord(address _patientaddress,address _doctoraddress,string memory _recordhash) public{
        if(permissionlist[_patientaddress].doc==_doctoraddress && permissionlist[_patientaddress].set == true)
        {
        uint got=getId(_patientaddress);
        count[got] = count[got]+1;
        uint go=count[got];
        recordList[_patientaddress][go]=record(_patientaddress,_recordhash);
           
        }
        else
        {    
            revert("No Permission Given");
       
        }
       
       
    }
   
    function getRecord(address _patientaddress,uint num) public view returns(
     string memory
    ){  
           
                return recordList[_patientaddress][num].recordHash;
           
    }
    function getDoctorName(address _docaddress)  public view returns(string memory){
        return doctorlist[_docaddress].doctorname;
    }
    function getDoctorPassword(address _docaddress)  public view returns(string memory){
        return doctorlist[_docaddress].password;
    }
   
   function getId(address _patientaddress) public view returns (uint){
       return userlist[_patientaddress].patid;
   }
   
   function getRecordCountPatient(uint _num) public view returns(uint){
       return count[_num];
   }
   
   function getNum(address _patientaddress) public view returns(uint){
       uint n=userlist[_patientaddress].patid;
       return count[n];
   }
   
}