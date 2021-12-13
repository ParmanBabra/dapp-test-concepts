// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RWD {
  string public name = "Reward Token";
  string public symbol = "RWD";
  uint256 public totalSupply = 1000000000000000000000000;
  uint8 public decimals = 18;
  address public owner;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  event Appoved(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor() {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);

    return true;
  }

  function appove(address _spander, uint256 _value)
    public
    returns (bool success)
  {
    allowance[msg.sender][_spander] = _value;
    emit Appoved(msg.sender, _spander, _value);

    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public returns (bool success) {
    require(balanceOf[_from] >= _value);
    require(allowance[msg.sender][_from] >= _value);

    balanceOf[_to] += _value;
    balanceOf[_from] -= _value;
    allowance[msg.sender][_from] -= _value;

    emit Transfer(_from, _to, _value);

    return true;
  }
}