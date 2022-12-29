pragma solidity ^0.4.24;

contract BaseContract{
    address owner;
    modifier isOwner(){
        require(owner == msg.sender);
        _;
    }
}
contract DerivedContract is BaseContract{
    address owner;
    uint now; // Overshadows current time stamp.

    constructor(){
        owner = msg.sender;
    }
    function withdraw() isOwner() external{
        msg.sender.transfer(this.balance);
    }

    function sensitive_function(address owner) public {
        // ...
        require(owner == msg.sender);
    }
    function alternate_sensitive_function() public {
        address owner = msg.sender;
        // ...
        require(owner == msg.sender);
    }
    
    function assert(bool condition) public {
        // Overshadows built-in symbol for providing assertions.
    }
    function get_next_expiration(uint earlier_time) private returns (uint) {
        return now + 259200; // References overshadowed timestamp.
    }
}