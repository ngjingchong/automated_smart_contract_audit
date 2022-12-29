pragma solidity ^0.4.24;
contract Bug {
    uint owner;
    function sensitive_function(address owner) public {
        // ...
        require(owner == msg.sender);
    }
    function alternate_sensitive_function() public {
        address owner = msg.sender;
        // ...
        require(owner == msg.sender);
    }
}