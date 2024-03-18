from flask import Flask, request, jsonify
from linkManager import LinkManager
from port import port

app = Flask(__name__)
link_manager = LinkManager()

@app.route('/add_link_pair', methods=['POST'])
def add_link_pair():
    link_pair = request.json
    result = link_manager.add_link_pair(link_pair)
    return jsonify(result)

@app.route('/get_link_pair/<any_link>', methods=['GET'])
def get_link_pair(any_link):
    result = link_manager.get_link_pair(any_link)
    return jsonify(result)

@app.route('/delete_link/<short_link>', methods=['DELETE'])
def delete_link(short_link):
    result = link_manager.delete_link(short_link)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=port)
