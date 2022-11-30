from flask import Flask

api = Flask(__name__)

import os

contracts = ["Vault.sol", "Reentrancy.sol"] #get name of contracts to be audited in this session
for c in contracts:
  os.system('cmd /c "slither ./src/contracts/' + c + ' --solc-remaps @openzeppelin=../../node_modules/@openzeppelin --json ./src/reports/report_'+ c +'.json"')

# @api.route('/data')
# def my_profile():
#   response_body = {
#     "name": "Nagato",
#     "about" :"Hello! I'm a full stack developer that loves python and javascript"
#   }

#   return response_body

if __name__ == "__main__":
  api.run(debug=True)