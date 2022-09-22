from flask import Flask, request,jsonify,json
app = Flask(__name__)

ONE = 1
TWO = 2
THREE = 4
FOUR = 8
FIVE = 16
SIX = 32
SEVEN = 64
EIGHT = 128
NINE = 256

COMBOS = []
COMBOS.append([])
COMBOS.append([])
COMBOS.append([TWO])
COMBOS.append([THREE, ONE + TWO])
COMBOS.append([FOUR, ONE + THREE])
COMBOS.append([FIVE, ONE + FOUR, TWO + THREE])
COMBOS.append([SIX, ONE + FIVE, TWO + FOUR, ONE + TWO + THREE])
COMBOS.append([SEVEN, ONE + SIX, ONE + TWO + FOUR, TWO + FIVE, THREE + FOUR])
COMBOS.append([EIGHT, ONE + SEVEN, ONE + TWO + FIVE, ONE + THREE + FOUR, TWO + SIX, THREE + FIVE, THREE + ONE + FOUR])
COMBOS.append([NINE, ONE + EIGHT, ONE + TWO + SIX, ONE + THREE + FIVE, TWO + SEVEN, TWO + THREE + FOUR, THREE + SIX, FOUR + FIVE])
COMBOS.append([NINE + ONE, ONE + TWO + SEVEN, ONE + TWO + THREE + FOUR, ONE + THREE + SIX, ONE + FOUR + FIVE, TWO + EIGHT, TWO + ONE + SEVEN, TWO + FOUR + SIX, THREE + SEVEN, THREE + TWO + FIVE, FOUR + SIX])
COMBOS.append([NINE + TWO, ONE + TWO + EIGHT, ONE + TWO + THREE + FIVE, TWO + THREE + SIX, TWO + FOUR + FIVE, THREE + EIGHT, THREE + ONE + SEVEN, FOUR + SEVEN, FIVE + SIX])
COMBOS.append([NINE + THREE, NINE + ONE + TWO, EIGHT + FOUR, EIGHT + ONE + THREE, SEVEN + FIVE, SEVEN + ONE + FOUR, SEVEN + TWO + THREE, SIX + TWO + FOUR, SIX + ONE + FIVE])

def getNumRolls(i: int) -> float:
	if i > 1 and i <= 7:
		return float(i-1)
	else:
		return float(6 - (i - 7))

def isComboPossible(board: int, combo: int) -> bool:
	if board & combo == combo:
		return True
	else:
		return False

def getScoreOfBoard(board: int) -> int:
	score = 0
	while board > 0:
		if board >= NINE:
			board = board - NINE
			score = score + 9
		if board >= EIGHT:
			board = board - EIGHT
			score = score + 8
		if board >= SEVEN:
			board = board - SEVEN
			score = score + 7
		if board >= SIX:
			board = board - SIX
			score = score + 6
		if board >= FIVE:
			board = board - FIVE
			score = score + 5
		if board >= FOUR:
			board = board - FOUR
			score = score + 4
		if board >= THREE:
			board = board - THREE
			score = score + 3
		if board >= TWO:
			board = board - TWO
			score = score + 2	
		if board >= ONE:
			board = board - ONE
			score = score + 1
	return score

def getExpectedScore(board: int) -> int:
	lclBoard = board
	print ("Call getExpectedScore for board " + str(lclBoard))
	if lclBoard == ONE:
		return 1
	if lclBoard == 0:
		return 0
	exVal = float(0)
	for roll in range(2, 13):
		pct = getNumRolls(roll) / float(36)
		score, good = getBestMove(lclBoard, roll)
		if good > 0:
			exVal = exVal + score * pct
		else:
			exScore = getScoreOfBoard(lclBoard)
			exVal = exVal + pct * float(exScore)

	return exVal

def getBestMove(board: int, roll: int):
	minScore = 512
	goodCombo = 0
	for combo in COMBOS[roll]:
		if isComboPossible(board, combo):
			exScore = getExpectedScore(board - combo)
			if exScore < minScore:
				minScore = exScore
				goodCombo = combo
	return minScore, goodCombo


@app.route("/getBestMove/<board>/<roll>")
def ext_getBestMove(board: int, roll: int):
	score, combo = getBestMove(int(board), int(roll))
	res = {"minScore":score, "move":combo}
	print(res)
	return jsonify(res)

def main():
	print (getExpectedScore(TWO + ONE))
	print (getBestMove(SEVEN + FOUR + THREE, 7))

if __name__ == "__main__":
    app.run()