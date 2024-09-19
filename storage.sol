// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract JKUAT{
    // state variables
    string public message;
    mapping (address => bool) hasAccess;
    // constructor
    constructor() {
        message = "first message";
        hasAccess[msg.sender] = true;
    }
    // reading functions (view returns) 
    // NO FUNDS
    function getMessage() external view returns(string memory){
        return message;
    }
    // writing functions (sending transactions)
    // NEED FUNDS
    function setMessage(string memory _newMessage) external{
        require(hasAccess[msg.sender], "You are not allowed to change the message");
        message = _newMessage;
    }
    function whiteListAnAddress(address _newAddress) external {
        require(msg.sender == 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, "You are not JKUAT");
        hasAccess[_newAddress] = true;
    }
    function isWhiteListed(address _address) external view returns(bool){
        return hasAccess[_address];
    }
}
