from flask import Flask
import os 

app = Flask(__name__)

@app.route('/activateMythril', methods=['POST'])
def server():
    os.system("myth analyze contracts/simple_dao.sol -o json > src/result.json")
    # os.system('wsl ~ -e sh -c "myth analyze contracts/simple_dao.sol -o json > result.json"')


