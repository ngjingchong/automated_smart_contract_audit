pragma solidity ^0.4.24;
contract Bug {
    uint now; // Overshadows current time stamp.
    function assert(bool condition) public {
        // Overshadows built-in symbol for providing assertions.
    }
    function get_next_expiration(uint earlier_time) private returns (uint) {
        return now + 259200; // References overshadowed timestamp.
    }
}